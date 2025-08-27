FROM ollama/ollama:latest

# Set environment variables
ENV OLLAMA_HOST=0.0.0.0
ENV OLLAMA_ORIGINS=*

# Expose the Ollama port
EXPOSE 11434

# Create startup script
RUN echo '#!/bin/bash\nollama serve &\nsleep 30\nollama pull llama3:8b\nwait' > /start.sh && chmod +x /start.sh

# Start with the script
CMD ["/start.sh"]
