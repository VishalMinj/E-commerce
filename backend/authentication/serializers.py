from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from users.models import CustomUser
import re


class UserSignUpSerializer(ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["email", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        """
        validating if
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
                {"error": "Password must have atleast 8 charectors!"}
            )
        if not re.search(r"[!@#$%^&*()_+={}\[\]:;\"'<>,.?/\\|`~-]", password):
            raise serializers.ValidationError(
                {"error": "Password must have atleast 1 special charectors!"}
            )
        if not re.search(r"[0-9]", password):
            raise serializers.ValidationError(
                {"error": "Password must have atleast 1 digit!"}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        username = validated_data.get("email").split("@")[0]
        return CustomUser.objects.create(username=username, **validated_data)
