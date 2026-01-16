import React, { useState } from "react";
import { Copy, Check, Link2, Sparkles } from "lucide-react";

export default function WeddingInvitationGenerator() {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");

  // Extract nama dari URL
  const extractNameFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const segments = pathname.split("/").filter(Boolean);
      const nameSlug = segments[segments.length - 1];

      // Convert slug to proper name (ahmad-budiman -> Ahmad Budiman)
      const name = nameSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return name;
    } catch {
      return "";
    }
  };

  // Handle input link
  const handleLinkChange = (e) => {
    const inputLink = e.target.value;
    setLink(inputLink);

    if (inputLink.trim()) {
      const name = extractNameFromUrl(inputLink);
      setGuestName(name);
    } else {
      setGuestName("");
    }
  };

  // Template undangan
  const generateInvitationText = () => {
    if (!guestName || !link) return "";

    return `Assalamualaikum Warahmatullahi Wabarakatuh

Kepada Yth:
${guestName}

Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala dan tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

Ainun Sekar Arcturiani Putri dan Farhan Taufiqul Hafidz.

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi: 

${link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini. Kami juga memohon maaf apabila ada kesalahan dalam penulisan nama ataupun gelar pada undangan.

Atas perhatiannya kami ucapkan terima kasih.

Wassalamualaikum Warahmatullahi Wabarakatuh`;
  };

  // Copy text
  const handleCopy = async () => {
    const text = generateInvitationText();
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const invitationText = generateInvitationText();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header dengan ornamen */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-100/30 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
              <Sparkles className="w-5 h-5 text-amber-600" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-3 tracking-tight">
              Doa Selamanya
            </h1>
            <p className="text-stone-500 text-sm md:text-base tracking-widest uppercase font-light">
              Wedding Invitation Generator
            </p>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-sm shadow-2xl border border-stone-200 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 px-8 py-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <Link2 className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-serif text-stone-800 tracking-wide">
                Masukkan Link Undangan
              </h2>
            </div>
          </div>

          <div className="p-8">
            <input
              type="text"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://ainunfarhan.com/ahmad-budiman"
              className="w-full px-6 py-4 border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all text-stone-700 placeholder-stone-400 bg-white font-light"
            />

            {guestName && (
              <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200">
                <p className="text-xs text-stone-500 mb-2 tracking-widest uppercase font-light">
                  Nama Tamu Terdeteksi
                </p>
                <p className="text-xl font-serif text-amber-900">{guestName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {invitationText && (
          <div className="bg-white rounded-sm shadow-2xl border border-stone-200 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 px-8 py-6 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif text-stone-800 tracking-wide">
                  Preview Undangan
                </h2>
                <div className="px-4 py-1 bg-emerald-100 text-emerald-800 text-xs tracking-widest uppercase font-light border border-emerald-200">
                  Ready
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-br from-stone-50 to-amber-50/30 p-8 md:p-10 border-2 border-amber-200/50 min-h-[350px] max-h-[550px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-stone-700 text-sm md:text-base leading-relaxed">
                  {invitationText}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Copy Button */}
        {invitationText && (
          <button
            onClick={handleCopy}
            className={`w-full py-6 font-serif text-lg tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-3 border-2 ${
              copied
                ? "bg-emerald-700 text-white border-emerald-800 shadow-emerald-200"
                : "bg-gradient-to-r from-amber-700 to-amber-800 text-white border-amber-900 hover:shadow-2xl hover:shadow-amber-200/50 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-6 h-6" />
                <span>Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                <span>Copy Text Undangan</span>
              </>
            )}
          </button>
        )}

        {/* Empty State */}
        {!invitationText && (
          <div className="bg-white rounded-sm shadow-2xl border border-stone-200 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
              <Link2 className="w-12 h-12 text-amber-600" />
            </div>
            <h3 className="text-2xl font-serif text-stone-800 mb-3">
              Masukkan Link Undangan
            </h3>
            <p className="text-stone-500 font-light">
              Teks undangan akan muncul setelah Anda memasukkan link
            </p>

            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
            </div>
          </div>
        )}

        {/* Footer dengan ornamen */}
        <div className="text-center mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-1 h-1 rounded-full bg-amber-600"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <p className="text-stone-400 text-xs tracking-widest uppercase font-light">
            © 2026 Doa Selamanya • Made with Love
          </p>
        </div>
      </div>
    </div>
  );
}
