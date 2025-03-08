from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from users.models import CustomUser
import re
from django.db.models import Q


class UserSignUpSerializer(ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["email", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        """
        Validating if
            1. checking if user with email exists
            2. password matches password2
            3. has min length of 8
            4. has atleast 1 digit
            5. has atleast 1 special charector
        """
        email = attrs.get("email", "")
        password = attrs.get("password", "")
        password2 = attrs.get("password2", "")

        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"error": "User with email allready exists!"}
            )

        if password != password2:
            raise serializers.ValidationError(
                {"error": "Your password does not match!"}
            )

        if not re.match(r".{8,}", password):
            raise serializers.ValidationError(
                {"error": "Password must have 8 charecter!"}
            )
        if not re.search(r"[!@#$%^&*()_+={}\[\]:;\"'<>,.?/\\|`~-]", password):
            raise serializers.ValidationError(
                {"error": "Password must have 1 special charecter!"}
            )
        if not re.search(r"[0-9]", password):
            raise serializers.ValidationError({"error": "Password must have 1 digit!"})

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        username = validated_data.get("email").split("@")[0]
        user=CustomUser.objects.create(username=username, **validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserLoginSerializer(ModelSerializer):

    userid = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "userid",
            "password",
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]
        extra_kwargs = {
            "userid": {"write_only": True},
            "password": {"write_only": True},
            "id": {"read_only": True},
            "username": {"read_only": True},
            "email": {"read_only": True},
            "first_name": {"read_only": True},
            "last_name": {"read_only": True},
        }

    def validate(self, attrs):
        """
        Validating if
            1. user with email/username exists
            2. password is correct
            3. user is verified
        """
        userid = attrs.get("userid", "")
        password = attrs.get("password", "")
        user = CustomUser.objects.filter(Q(email=userid) | Q(username=userid)).first()
        if user is None:
            raise serializers.ValidationError(
                {"error": "User with this email/username does not exists!"}
            )
        if not user.is_verified:
            raise serializers.ValidationError({"error": "Your email is not verified!"})
        if not user.check_password(password):
            raise serializers.ValidationError({"error": "Incorrect password!"})

        self.instance = user
        return attrs
