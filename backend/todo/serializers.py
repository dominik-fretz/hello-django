from rest_framework import serializers
from .models import Todo, Note

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('subject', 'body')