import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, Search, Paperclip, Mic, ChevronDown, MoreVertical } from 'lucide-react';

const GlassChatApp = () => {
  // États
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeView, setActiveView] = useState<'contacts' | 'chat'>('contacts');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Données
  const users = [
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: 'EW',
      status: 'online',
      messages: [
        { id: 1, text: 'Salut, comment ça va ?', time: '10:30', sent: false },
        { id: 2, text: 'Je voulais savoir pour ma commande', time: '10:32', sent: false },
        { id: 3, text: 'Tout va bien, merci ! Votre commande est en préparation.', time: '10:35', sent: true }
      ]
    },
    {
      id: 2,
      name: 'Lucas Martin',
      avatar: 'LM',
      status: 'offline',
      messages: [
        { id: 1, text: 'Bonjour, j\'ai un problème technique', time: '09:15', sent: false },
        { id: 2, text: 'Pouvez-vous m\'aider ?', time: '09:16', sent: false }
      ]
    }
  ];

  // Effets
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUser]);

  // Handlers
  const handleSendMessage = () => {
    if (!message.trim() || selectedUser === null) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };

    // Ici vous devriez mettre à jour votre state ou API
    setMessage('');
  };

  const selectUser = (userId: number) => {
    setSelectedUser(userId);
    if (isMobile) setActiveView('chat');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-blue-100 font-sans">
      {/* Version Desktop */}
      {!isMobile && (
        <div className="flex w-full h-full">
          {/* Sidebar - Contacts */}
          <div className="w-96 bg-white bg-opacity-70 backdrop-blur-lg border-r border-white border-opacity-30">
            <div className="p-5 border-b border-white border-opacity-30">
              <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold text-indigo-900">Messages</h1>
                <button className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70">
                  <MoreVertical size={20} className="text-indigo-600" />
                </button>
              </div>
              
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-opacity-70"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-110px)]">
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => selectUser(user.id)}
                  className={`p-4 border-b border-white border-opacity-20 cursor-pointer transition-all ${
                    selectedUser === user.id 
                      ? 'bg-indigo-100 bg-opacity-50' 
                      : 'hover:bg-white hover:bg-opacity-30'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        user.status === 'online' 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      } font-medium shadow-sm`}>
                        {user.avatar}
                      </div>
                      {user.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-indigo-900">{user.name}</h3>
                        <span className="text-xs text-indigo-400">
                          {user.messages[user.messages.length - 1]?.time}
                        </span>
                      </div>
                      <p className="text-sm text-indigo-700 text-opacity-70 truncate mt-1">
                        {user.messages[user.messages.length - 1]?.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de chat principale */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* En-tête de chat */}
                <div className="p-4 border-b border-white border-opacity-30 bg-white bg-opacity-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      users.find(u => u.id === selectedUser)?.status === 'online' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } font-medium`}>
                      {users.find(u => u.id === selectedUser)?.avatar}
                    </div>
                    <div className="ml-3">
                      <h2 className="font-semibold text-indigo-900">
                        {users.find(u => u.id === selectedUser)?.name}
                      </h2>
                      <p className="text-xs text-indigo-400">
                        {users.find(u => u.id === selectedUser)?.status === 'online' 
                          ? 'En ligne' 
                          : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-30">
                    <MoreVertical size={18} className="text-indigo-500" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-indigo-50 bg-opacity-30">
                  <div className="space-y-4">
                    {users.find(u => u.id === selectedUser)?.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sent ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[75%] p-4 rounded-2xl ${
                            msg.sent
                              ? 'bg-indigo-500 text-white rounded-br-none'
                              : 'bg-white text-indigo-900 rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-2 ${
                            msg.sent ? 'text-indigo-100' : 'text-indigo-400'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Zone de saisie */}
                <div className="p-4 bg-white bg-opacity-50 border-t border-white border-opacity-30">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-indigo-500 hover:text-indigo-600">
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Écrivez un message..."
                      className="flex-1 border border-white border-opacity-50 bg-white bg-opacity-70 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    {message ? (
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                      >
                        <Send size={20} />
                      </button>
                    ) : (
                      <button className="p-2 text-indigo-500 hover:text-indigo-600">
                        <Mic size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-indigo-50">
                <div className="text-center max-w-md p-6">
                  <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">Aucune conversation sélectionnée</h3>
                  <p className="text-indigo-600 mb-6">Sélectionnez une conversation pour commencer à discuter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Version Mobile */}
      {isMobile && (
        <div className="flex-1 flex flex-col">
          {activeView === 'contacts' ? (
            <div className="flex-1">
              {/* En-tête mobile */}
              <div className="p-4 bg-white bg-opacity-70 backdrop-blur-lg border-b border-white border-opacity-30">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold text-indigo-900">Messages</h1>
                  <button className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70">
                    <MoreVertical size={20} className="text-indigo-600" />
                  </button>
                </div>
                
                <div className="relative mt-4">
                  <Search size={18} className="absolute left-3 top-3 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-opacity-70"
                  />
                </div>
              </div>

              {/* Liste des contacts */}
              <div className="overflow-y-auto h-[calc(100%-90px)]">
                {users.map(user => (
                  <div
                    key={user.id}
                    onClick={() => selectUser(user.id)}
                    className="p-4 border-b border-white border-opacity-20 cursor-pointer hover:bg-white hover:bg-opacity-30 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          user.status === 'online' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        } font-medium shadow-sm`}>
                          {user.avatar}
                        </div>
                        {user.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-indigo-900">{user.name}</h3>
                          <span className="text-xs text-indigo-400">
                            {user.messages[user.messages.length - 1]?.time}
                          </span>
                        </div>
                        <p className="text-sm text-indigo-700 text-opacity-70 truncate mt-1">
                          {user.messages[user.messages.length - 1]?.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* En-tête chat mobile */}
              <div className="p-4 bg-white bg-opacity-70 backdrop-blur-lg border-b border-white border-opacity-30 flex items-center">
                <button 
                  onClick={() => setActiveView('contacts')}
                  className="mr-3"
                >
                  <ChevronDown size={20} className="text-indigo-600 transform rotate-90" />
                </button>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  users.find(u => u.id === selectedUser)?.status === 'online' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                } font-medium`}>
                  {users.find(u => u.id === selectedUser)?.avatar}
                </div>
                <div className="ml-3 flex-1">
                  <h2 className="font-semibold text-indigo-900">
                    {users.find(u => u.id === selectedUser)?.name}
                  </h2>
                  <p className="text-xs text-indigo-400">
                    {users.find(u => u.id === selectedUser)?.status === 'online' 
                      ? 'En ligne' 
                      : 'Hors ligne'}
                  </p>
                </div>
                <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-30">
                  <MoreVertical size={18} className="text-indigo-500" />
                </button>
              </div>

              {/* Messages mobile */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-indigo-50 bg-opacity-30">
                <div className="space-y-4">
                  {users.find(u => u.id === selectedUser)?.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sent ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          msg.sent
                            ? 'bg-indigo-500 text-white rounded-br-none'
                            : 'bg-white text-indigo-900 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-2 ${
                          msg.sent ? 'text-indigo-100' : 'text-indigo-400'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Zone de saisie mobile */}
              <div className="p-3 bg-white bg-opacity-70 backdrop-blur-lg border-t border-white border-opacity-30">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-indigo-500 hover:text-indigo-600">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez un message..."
                    className="flex-1 border border-white border-opacity-50 bg-white bg-opacity-70 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  {message ? (
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                    >
                      <Send size={20} />
                    </button>
                  ) : (
                    <button className="p-2 text-indigo-500 hover:text-indigo-600">
                      <Mic size={20} />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlassChatApp;