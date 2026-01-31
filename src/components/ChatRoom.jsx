import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { VscSend, VscSignOut, VscLock } from "react-icons/vsc";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    // Memperbaiki sudut hitam dengan menyamakan bg-color dan overflow-hidden
    <div className="flex flex-col h-[600px] w-full bg-[#111114] rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl relative antialiased">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center px-8 py-6 bg-[#16161a] border-b border-white/[0.05] shrink-0 z-20">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img src={user.photoURL} alt="avatar" className="relative w-11 h-11 rounded-full border border-white/10 object-cover" />
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-[#16161a] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              {/* Font disesuaikan agar serupa dengan gaya "Live Chat" portofolio */}
              <span className="text-lg font-semibold text-violet-400">
                {user.displayName}
              </span>
              <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-[0.15em] mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> 
                Online
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-zinc-500">
            <VscLock size={16} className="text-violet-500/30" />
            {/* Font "Encrypted" disesuaikan dengan gaya judul portofolio */}
            <span className="text-[11px] font-bold text-[#a78bfa]/60 uppercase tracking-[0.2em] leading-none">
              Secure Transmission
            </span>
          </div>
        )}
        
        {user && (
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/[0.03] hover:bg-red-500/10 text-zinc-500 hover:text-red-400 p-2.5 rounded-2xl border border-white/[0.04] transition-all duration-300 group"
          >
            <VscSignOut size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        )}
      </div>

      {/* --- CHAT AREA --- */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar bg-[#111114]">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-30">
             <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">Establishing link...</p>
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMe = msg.uid === user?.uid;
          const showAvatar = !isMe && (index === 0 || messages[index - 1].uid !== msg.uid);
          
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-700`}>
              <div className={`flex gap-4 max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!isMe && (
                  <div className="w-9 flex-shrink-0">
                    {showAvatar ? (
                      <img src={msg.photoURL || "https://via.placeholder.com/40"} className="w-9 h-9 rounded-full border border-white/10 self-end shadow-2xl" alt="u" />
                    ) : <div className="w-9" />}
                  </div>
                )}
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  {showAvatar && (
                    <span className="text-xs font-medium text-violet-400 mb-1 ml-1">
                      {msg.displayName}
                    </span>
                  )}
                  <div className={`group relative px-5 py-3.5 rounded-[1.3rem] text-[14px] leading-relaxed shadow-2xl transition-all font-medium ${
                    isMe 
                      ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-tr-none border-t border-white/20" 
                      : "bg-[#1c1c21] text-zinc-100 rounded-tl-none border border-white/[0.05]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={dummy}></div>
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-6 bg-[#16161a] border-t border-white/[0.05] shrink-0">
        {user ? (
          <form onSubmit={sendMessage} className="flex gap-4 items-center max-w-5xl mx-auto">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-black/30 border border-white/[0.03] text-zinc-100 text-[14px] font-medium rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700"
            />
            <button 
              type="submit" 
              disabled={!message.trim()} 
              className="bg-violet-600 hover:bg-violet-500 active:scale-90 text-white p-4 rounded-2xl transition-all disabled:opacity-20 shadow-2xl shadow-violet-600/30 flex items-center justify-center border-t border-white/20"
            >
              <VscSend size={24} />
            </button>
          </form>
        ) : (
          <div className="py-2">
            <button 
              onClick={loginWithGoogle} 
              className="w-full group relative flex items-center justify-center gap-4 bg-white text-black font-bold py-5 rounded-2xl hover:bg-zinc-200 active:scale-[0.98] transition-all text-[12px] uppercase tracking-[0.2em] shadow-2xl"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="G" />
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}