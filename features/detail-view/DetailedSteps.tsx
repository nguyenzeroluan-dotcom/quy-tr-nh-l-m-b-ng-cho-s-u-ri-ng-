import React from 'react';
import { RichStep } from '../../types';
import { LeafIcon, ChevronRightIcon } from '../../components/Icons';

interface DetailedStepsProps {
  intro: string;
  steps: RichStep[];
  onStepClick: (step: RichStep) => void;
}

export const DetailedSteps: React.FC<DetailedStepsProps> = ({ intro, steps, onStepClick }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-green-100 p-2 rounded-lg mr-3"><LeafIcon className="w-6 h-6 text-green-700" /></span>
        Quy Trình Chi Tiết
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-green-500 pl-6 italic text-lg bg-gray-50 py-4 rounded-r-lg">
        {intro}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => onStepClick(step)}
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-green-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-inner">
                {step.icon ? <step.icon className="w-6 h-6" /> : <span className="font-bold text-xl">{idx + 1}</span>}
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">Bước {idx + 1}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">{step.content}</p>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-400">Bấm để xem chi tiết</span>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
