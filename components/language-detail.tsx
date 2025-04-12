"use client"

import type React from "react"

interface LanguageDetailProps {
  language: {
    name: string
    year: number
    type: string
    designedBy: string
    influencedBy?: string[]
    usedFor?: string
    strengths?: string[]
    weaknesses?: string[]
  }
  handleTypeClick: (type: string, e: React.MouseEvent) => void
}

const LanguageDetail: React.FC<LanguageDetailProps> = ({ language, handleTypeClick }) => {
  const getTypeColorClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "compiled":
        return "bg-red-500"
      case "interpreted":
        return "bg-green-500"
      case "scripting":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{language.name}</h2>
      <p className="mb-2">Year: {language.year}</p>
      <p className="mb-2">Designed By: {language.designedBy}</p>

      <div
        className={`inline-block px-3 py-1 text-white font-bold ${getTypeColorClass(language.type)} cursor-pointer hover:opacity-80 transition-opacity`}
        aria-label={`Type: ${language.type}. Cliquez pour filtrer par ce type.`}
        onClick={(e) => handleTypeClick(language.type, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleTypeClick(language.type, e as unknown as React.MouseEvent)
          }
        }}
      >
        {language.type}
      </div>

      {language.influencedBy && language.influencedBy.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Influenced By:</h3>
          <ul>
            {language.influencedBy.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      )}

      {language.usedFor && (
        <div className="mt-4">
          <h3 className="font-bold">Used For:</h3>
          {language.usedFor.split(",").map((use, index) => (
            <p key={index} className="flex items-start">
              - {use.trim()}
            </p>
          ))}
        </div>
      )}

      {language.strengths && (
        <div className="mt-4">
          <h3 className="font-bold">Strengths:</h3>
          <ul>
            {language.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                - {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {language.weaknesses && language.weaknesses.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Weaknesses:</h3>
          <ul>
            {language.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageDetail
