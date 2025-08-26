FROM ollama/ollama:latest

# Set environment variables
ENV OLLAMA_HOST=0.0.0.0
ENV OLLAMA_ORIGINS=*

# Expose the Ollama port
EXPOSE 11434

# Start Ollama and pull the model
CMD ["sh", "-c", "ollama serve & sleep 10 && ollama pull llama3:8b && wait"]
