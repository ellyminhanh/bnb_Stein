from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .forms import PropertyForm
from .models import Property
from .serializers import PropertiesListSerializers

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list (request):
    properties = Property.objects.all()
    serializers = PropertiesListSerializers(properties, many = True)
    return JsonResponse({
        'data': serializers.data
    })
    
    
@api_view(['POST','FILES'])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()
        return JsonResponse({'scucess': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()},status = 400)
    