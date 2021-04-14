from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer, NoteSerializer
from .models import Todo, Note

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()