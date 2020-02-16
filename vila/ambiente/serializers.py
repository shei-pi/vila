from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import DeviceData


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class DeviceDataSerializer(serializer.ModelSerializer):
    class Meta:
        model = DeviceData
        fields = ['id', 'title', 'code', 'linenos', 'language', 'style']
