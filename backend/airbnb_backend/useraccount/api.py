
from .models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import UserDetailSerializer
from property.serializers import ReservationListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many= False)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def reservations_list(request):
    #reservations = re].objects.select_related('property').all()
    reservations = request.user.reservations.all()
    print('user', request.user)
    print(reservations)
    serializer = ReservationListSerializer(reservations, many=True)
    print("API Response:", serializer.data)  # Add this line
    return JsonResponse(serializer.data, safe=False)

