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
  const scrollRef = useRef();

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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="flex flex-col h-[450px] md:h-[500px] w-full bg-[#111114] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl relative antialiased transition-all">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-[#16161a] border-b border-white/[0.05] shrink-0 z-20">
        {user ? (
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img src={user.photoURL} alt="avatar" className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 object-cover" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-[#16161a] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-semibold text-violet-400 leading-tight">
                {user.displayName}
              </span>
              <span className="text-[8px] md:text-[9px] font-semibold text-emerald-400/80 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> 
                Online
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-3 text-zinc-500">
            {/* PERBAIKAN: Ukuran icon gembok sekarang proporsional (18px - 20px) */}
            <VscLock size={18} className="text-violet-500/30 md:w-5 md:h-5" />
            <span className="text-[9px] md:text-[11px] font-bold text-[#a78bfa]/60 uppercase tracking-widest leading-none">
              Secure Transmission
            </span>
          </div>
        )}
        
        {user && (
          <button
            onClick={logout}
            className="flex items-center bg-white/[0.03] hover:bg-red-500/10 text-zinc-500 hover:text-red-400 p-2 md:p-2 rounded-xl border border-white/[0.04] transition-all group"
          >
            <VscSignOut size={18} className="md:w-5 md:h-5 group-hover:rotate-12" />
          </button>
        )}
      </div>

      {/* --- CHAT AREA --- */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar bg-[#111114]">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-30">
             <p className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Establishing link...</p>
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMe = msg.uid === user?.uid;
          const showAvatar = !isMe && (index === 0 || messages[index - 1].uid !== msg.uid);
          
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-700`}>
              <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!isMe && (
                  <div className="w-7 md:w-8 flex-shrink-0">
                    {showAvatar ? (
                      <img src={msg.photoURL || "https://via.placeholder.com/40"} className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 self-end shadow-xl" alt="u" />
                    ) : <div className="w-7 md:w-8" />}
                  </div>
                )}
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  {showAvatar && (
                    <span className="text-[10px] md:text-xs font-medium text-violet-400 mb-1 ml-1">
                      {msg.displayName}
                    </span>
                  )}
                  <div className={`group relative px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[11px] md:text-[13px] leading-relaxed shadow-2xl transition-all font-medium ${
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
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-3 md:p-4 bg-[#16161a] border-t border-white/[0.05] shrink-0">
        {user ? (
          <form onSubmit={sendMessage} className="flex gap-2 md:gap-3 items-center w-full">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-black/30 border border-white/[0.03] text-zinc-100 text-xs md:text-[13px] font-medium rounded-xl px-4 py-2.5 md:py-3 focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-zinc-700"
            />
            <button 
              type="submit" 
              disabled={!message.trim()} 
              className="bg-violet-600 hover:bg-violet-500 active:scale-90 text-white p-2.5 md:p-3 rounded-xl transition-all disabled:opacity-20 shadow-xl shadow-violet-600/30 flex items-center justify-center border-t border-white/20"
            >
              <VscSend className="size-4 md:size-5" />
            </button>
          </form>
        ) : (
          <div className="py-1">
            <button 
              onClick={loginWithGoogle} 
              className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-bold py-3 md:py-4 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all text-[10px] md:text-[11px] uppercase tracking-widest shadow-2xl"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" alt="G" />
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}