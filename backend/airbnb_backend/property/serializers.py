from rest_framework import serializers

from .models import Property

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
