'use client'

import { useState } from 'react'
import { Languages, ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/lib/translations'

interface TranslationButtonProps {
  originalText: string
  translationType: 'question' | 'answer'
  className?: string
}

export function TranslationButton({ 
  originalText, 
  translationType, 
  className = "" 
}: TranslationButtonProps) {
  const [isTranslated, setIsTranslated] = useState(false)
  const { currentLanguage, translateQuestion } = useTranslation()
  
  // Nur anzeigen wenn nicht Deutsch
  if (currentLanguage === 'de') return null
  
  const translatedText = translateQuestion(originalText)
  const displayText = isTranslated ? translatedText : originalText
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">
          {translationType === 'question' ? 'Frage' : 'Antwort'}
        </span>
        <button
          onClick={() => setIsTranslated(!isTranslated)}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium transition-colors"
        >
          {isTranslated ? (
            <>
              <ArrowLeft className="w-3 h-3" />
              Deutsch
            </>
          ) : (
            <>
              <Languages className="w-3 h-3" />
              Übersetzen
            </>
          )}
        </button>
      </div>
      
      <div className={`p-3 rounded-lg border-2 transition-all ${
        isTranslated 
          ? 'border-blue-200 bg-blue-50' 
          : 'border-gray-200 bg-white'
      }`}>
        <p className="text-gray-800 leading-relaxed">
          {displayText}
        </p>
        
        {isTranslated && (
          <div className="mt-2 pt-2 border-t border-blue-200">
            <p className="text-xs text-blue-600 font-medium">
              📱 Automatische Übersetzung • Zum Verständnis
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
