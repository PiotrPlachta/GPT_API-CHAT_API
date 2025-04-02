import os
from flask import Flask, render_template, request, jsonify, send_from_directory
import openai
import requests
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY')

# External API endpoint for order status
ORDER_API_ENDPOINT = os.getenv('ORDER_API_ENDPOINT')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    chat_history = data.get('history', [])
    
    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})
    
    # Check if the message contains an order number request
    if any(msg.get('role') == 'assistant' and 'order number' in msg.get('content', '').lower() for msg in chat_history):
        # Try to extract order number from user message
        try:
            # This is a simple extraction, you might need more sophisticated parsing
            order_number = ''.join(filter(str.isdigit, user_message))
            email = data.get('email', 'user@example.com')  # Get email from request or use default
            
            if order_number:
                # Prepare data for external API
                order_data = {
                    "orderNumber": order_number,
                    "email": email
                }
                
                # Query external API for order status
                try:
                    # For now, we'll simulate a response
                    # In production, replace with actual API call:
                    # response = requests.post(ORDER_API_ENDPOINT, json=order_data)
                    # order_status = response.json()
                    
                    # Simulated response
                    order_status = {
                        "status": "Shipped",
                        "details": "Your order was shipped on April 1, 2025 and is expected to arrive by April 5, 2025."
                    }
                    
                    assistant_message = f"Thank you! I found your order #{order_number}. Status: {order_status.get('status', 'Unknown')}. {order_status.get('details', '')}"
                except Exception as e:
                    assistant_message = f"I encountered an error while retrieving your order: {str(e)}"
            else:
                assistant_message = "I couldn't identify an order number in your message. Please provide just the order number."
        except Exception as e:
            assistant_message = f"I encountered an error processing your request: {str(e)}"
    else:
        # Send message to OpenAI API
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for an e-commerce store. Ask the user for their order number to check the status. Don't provide any information until you have the order number."}
                ] + chat_history
            )
            assistant_message = response.choices[0].message.content
        except Exception as e:
            assistant_message = f"I encountered an error: {str(e)}"
    
    # Add assistant message to history
    chat_history.append({"role": "assistant", "content": assistant_message})
    
    return jsonify({
        "message": assistant_message,
        "history": chat_history
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
