import React, { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'admin'; // Modifié ici
  timestamp: Date;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  isClient: boolean; // Nouveau champ pour distinguer clients/admin
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour, je voudrais suivre ma commande #12345',
      sender: 'client', // Message venant du client
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      text: 'Votre commande est en cours de préparation',
      sender: 'admin', // Votre réponse en tant qu'admin
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);

  const [contacts] = useState<Contact[]>([
    { id: 1, name: 'Client Dupont', avatar: 'CD', online: true, isClient: true },
    { id: 2, name: 'Client Martin', avatar: 'CM', online: false, isClient: true },
    { id: 3, name: 'Moi (Admin)', avatar: 'AD', online: true, isClient: false }, // Vous en tant qu'admin
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    // En tant qu'admin, tous vos messages sont de type 'admin'
    const adminMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'admin',
      timestamp: new Date()
    };

    setMessages([...messages, adminMessage]);
    setNewMessage('');

    // Simulation de réponse du client (seulement si vous parlez à un client)
    if (selectedContact.isClient) {
      setTimeout(() => {
        const clientReply: Message = {
          id: messages.length + 2,
          text: `Merci pour votre réponse concernant ma commande`,
          sender: 'client',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, clientReply]);
      }, 1500);
    }
  };

  useEffect(() => {
    // Sélectionner automatiquement le premier client
    const firstClient = contacts.find(c => c.isClient) || contacts[0];
    setSelectedContact(firstClient);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Messages clients</h2>
          <div className="text-sm text-gray-500">Admin</div>
        </div>

        {contacts.map(contact => (
          <div
            key={contact.id}
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 ${
              selectedContact?.id === contact.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setSelectedContact(contact)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
              contact.isClient ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              {contact.avatar}
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-500">
                {contact.isClient ? 'Client' : 'Vous'} • {contact.online ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center bg-gray-50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                selectedContact.isClient ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {selectedContact.avatar}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{selectedContact.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedContact.isClient ? 'Client' : 'Votre compte admin'}
                </p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'admin'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie seulement si un client est sélectionné */}
            {selectedContact.isClient && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Répondre au client..."
                    className="flex-1 border rounded-l-full py-2 px-4 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-green-600 text-white rounded-r-full px-4 disabled:bg-gray-300"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Sélectionnez un client</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;