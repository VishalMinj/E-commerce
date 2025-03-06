from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from users.models import CustomUser
from django.core.mail import send_mail as sm
from config import settings
from threading import Thread
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken


signer = TimestampSigner(salt="email-verification")


def execute_in_background(function):
    """
    Function to send the email in background
    """

    def start_thread(*args, **kwargs):
        thread = Thread(target=function, args=args, kwargs=kwargs)
        thread.start()

    return start_thread


def generate_verification_token(user):
    """
    Generates the verification token for the user
    via there user id also addes a timestamp
    """
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    signed_value = signer.sign(uid)
    return signed_value


def verify_token(token):
    """
    Chest if the token is valid and not expired
    if valid return the user
    """
    try:
        unsigned_value = signer.unsign(
            token, max_age=settings.EMAIL_VERIFICATION_EXPIRATION
        )
        uid = force_str(urlsafe_base64_decode(unsigned_value))
        user = CustomUser.objects.get(pk=uid)
        return user
    except (CustomUser.DoesNotExist, BadSignature, SignatureExpired):
        return None


@execute_in_background
def send_mail(subject, message, email, verification_url,template_name):
    """
    Send the email to the user with the verification verification_url
    via threading
    """
    convert_to_html_content = render_to_string(
        template_name=template_name, context={"verification_url": verification_url}
    )
    sm(
        subject=subject,
        message=message,
        recipient_list=[email],
        from_email=settings.EMAIL_HOST_USER,
        html_message=convert_to_html_content,
    )


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
