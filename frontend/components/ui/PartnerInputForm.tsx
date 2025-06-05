import { User, Users } from "lucide-react";

interface PartnerInputFormProps {
  partner1Name: string;
  setPartner1Name: (name: string) => void;
  partner2Name: string;
  setPartner2Name: (name: string) => void;
  error?: string;
  onContinue: () => void;
}

export const PartnerInputForm = ({ 
  partner1Name, 
  setPartner1Name, 
  partner2Name, 
  setPartner2Name, 
  error, 
  onContinue 
}: PartnerInputFormProps) => {
  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
      <div className="text-center mb-6">
        <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Enter Partner Names</h3>
        <p className="text-gray-600 text-sm mt-2">These will be permanently stored on the blockchain</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Partner
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={partner1Name}
              onChange={(e) => setPartner1Name(e.target.value)}
              placeholder="Enter first partner's name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
              maxLength={20}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Second Partner
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={partner2Name}
              onChange={(e) => setPartner2Name(e.target.value)}
              placeholder="Enter second partner's name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
              maxLength={20}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={onContinue}
          disabled={!partner1Name.trim() || !partner2Name.trim()}
          className={`w-full py-4 text-xl font-bold rounded-xl transition-all duration-300 ${
            !partner1Name.trim() || !partner2Name.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }`}
        >
          Continue to Minting ✨
        </button>
      </div>
    </div>
  );
};

