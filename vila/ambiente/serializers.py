from django.contrib.auth.models import User, Group
from rest_framework import serializers
from ambiente.models import DeviceData, Device


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class DeviceDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DeviceData
        fields = ['device', 'temperature', 'humidity', 
                    'compressor_status', 'fan_status', 'line_current', 'line_voltage']

    def create(self, validated_data):
        device = validated_data.pop('device')
        device_instance, created = Device.objects.get_or_create(device_id=device)
        devicedata_instance = DeviceData.objects.create(**validated_data, device=device_instance)
        return devicedata_instance

class DeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
        fields = ['device_id','url', 'user' ]
