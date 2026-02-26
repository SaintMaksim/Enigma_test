from rest_framework import serializers
from .models import Mail


class MailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mail
        fields = [
            'id',
            'date',
            'full_name',
            'sender',
            'tel_number',
            'email',
            'factory_nums',
            'device_type',
            'emotional_color',
            'question'
        ]