from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from mails.serializers import MailSerializer
from mails.models import Mail


class MailListView(APIView):

    def get(self, request):
        mails = Mail.objects.all()
        serializer = MailSerializer(mails, many=True)
        return Response(serializer.data)


class MailCreateView(APIView):

    def post(self, request):
        serializer = MailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
