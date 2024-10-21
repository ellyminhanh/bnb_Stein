from rest_framework import serializers

from .models import Property
from useraccount.serializers import UserDetailSerializer
from useraccount.serializers import UserDetailSerializer

class PropertiesListSerializers(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url'
        )
    def get_image_url(self, obj):
        # Make sure there's no extra dot here
        return f'http://localhost:8000{obj.image.url}'


class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only= True, many=False)
    
    class Meta: 
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'price_per_night',
            'image_url',
            'bedrooms',
            'bathrooms',
            'guests',
            'landlord'
        )