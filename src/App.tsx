/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, ArrowRight, Brain, BarChart, Users, Sparkles, Cpu } from 'lucide-react';

// --- Data & Logic ---

const questions = [
  {
    id: 1,
    title: "Uso de IA",
    question: "¿Cómo utilizás hoy la inteligencia artificial en tu trabajo?",
    icon: <Brain className="w-6 h-6 text-xetro-violet-light" />,
    options: [
      { text: "No la uso o solo para consultas básicas muy esporádicas.", points: 1 },
      { text: "Uso ChatGPT u otras herramientas para redactar correos o textos simples.", points: 2 },
      { text: "Integro IA en varias tareas diarias para optimizar mi tiempo y el de mi equipo.", points: 3 },
      { text: "He automatizado flujos de trabajo completos y la IA es central en nuestra estrategia.", points: 4 }
    ]
  },
  {
    id: 2,
    title: "Rol del líder",
    question: "¿Cómo describirías tu rol hoy dentro de tu equipo o negocio?",
    icon: <Users className="w-6 h-6 text-xetro-violet" />,
    options: [
      { text: "Estoy en el día a día apagando incendios y resolviendo problemas urgentes.", points: 1 },
      { text: "Superviso tareas y delego, pero sigo muy involucrado en la ejecución.", points: 2 },
      { text: "Me enfoco en la estrategia y el crecimiento, delegando la mayor parte de la operación.", points: 3 },
      { text: "Diseño sistemas y formo líderes; mi negocio/equipo funciona perfectamente sin mí.", points: 4 }
    ]
  },
  {
    id: 3,
    title: "Gestión de procesos",
    question: "¿Cómo funcionan hoy tus procesos?",
    icon: <Cpu className="w-6 h-6 text-xetro-violet-light" />,
    options: [
      { text: "Todo está en mi cabeza o en notas sueltas. Dependemos de la memoria.", points: 1 },
      { text: "Tenemos algunos documentos y planillas, pero no siempre se respetan.", points: 2 },
      { text: "Los procesos están documentados y el equipo los sigue en su mayoría.", points: 3 },
      { text: "Tenemos sistemas automatizados y optimizados continuamente con tecnología.", points: 4 }
    ]
  },
  {
    id: 4,
    title: "Toma de decisiones",
    question: "¿En qué te basás principalmente para tomar decisiones?",
    icon: <BarChart className="w-6 h-6 text-xetro-violet" />,
    options: [
      { text: "Me baso en mi intuición y experiencia del momento.", points: 1 },
      { text: "Consulto con mi equipo y reviso algunos datos básicos antes de decidir.", points: 2 },
      { text: "Analizo métricas y KPIs establecidos para tomar decisiones informadas.", points: 3 },
      { text: "Utilizo análisis predictivo y datos en tiempo real para anticipar escenarios.", points: 4 }
    ]
  }
];

const getResult = (score: number) => {
  if (score <= 7) {
    return {
      title: "Líder Operativo",
      description: "Alta carga operativa, baja integración de IA y procesos poco estructurados.",
      message: "Estás sosteniendo el sistema… pero el sistema todavía depende de vos.",
      colorClass: "neon-text-violet-light",
      bgClass: "bg-xetro-violet-light",
      progress: (score / 16) * 100
    };
  } else if (score <= 11) {
    return {
      title: "Líder en Evolución",
      description: "Empezás a delegar, usás herramientas pero de forma aislada. Tenés potencial claro.",
      message: "Estás en transición: el próximo paso no es hacer más… es diseñar mejor.",
      colorClass: "neon-text-violet",
      bgClass: "bg-xetro-violet",
      progress: (score / 16) * 100
    };
  } else {
    return {
      title: "Líder Estratégico",
      description: "Usás IA con intención, tenés procesos claros y pensás en escalabilidad.",
      message: "Ya no liderás tareas… liderás sistemas.",
      colorClass: "text-white text-shadow-glow",
      bgClass: "bg-gradient-to-r from-xetro-violet-light to-xetro-violet",
      progress: (score / 16) * 100
    };
  }
};

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img 
      src="/logo.png" 
      alt="Xetro Logo" 
      className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      referrerPolicy="no-referrer"
    />
  </div>
);

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, currentQuestion]);

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (currentQuestion < questions.length - 1) {
      setScore(newScore);
      setCurrentQuestion(prev => prev + 1);
    } else {
      setScore(newScore);
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('start');
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <AnimatePresence mode="wait">
        
        {/* --- START SCREEN --- */}
        {step === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full flex flex-col items-center text-center space-y-10"
          >
            <Logo className="scale-125 mb-4" />
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Descubrí tu perfil de <span className="neon-text-violet-light">Liderazgo</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                Evaluá tu integración de IA, gestión de procesos y toma de decisiones en este breve cuestionario diseñado para líderes.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="btn-primary btn-primary-glow px-8 py-4 rounded-full text-lg flex items-center gap-2 mt-8"
            >
              Comenzar Evaluación
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* --- QUIZ SCREEN --- */}
        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl w-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <Logo className="scale-75 origin-left" />
              <div className="text-sm font-medium text-gray-400 tracking-widest uppercase">
                Pregunta {currentQuestion + 1} / {questions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-800 rounded-full mb-12 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-xetro-violet-light to-xetro-violet"
                initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 sm:p-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  {questions[currentQuestion].icon}
                  <h2 className="text-xl font-semibold text-xetro-violet-light tracking-wide uppercase">
                    {questions[currentQuestion].title}
                  </h2>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-medium mb-10 leading-snug">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className="glass-button w-full text-left p-5 rounded-xl flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-sm font-medium group-hover:border-xetro-violet-light group-hover:text-xetro-violet-light transition-colors mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-gray-200 text-lg leading-relaxed group-hover:text-white transition-colors">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- RESULT SCREEN --- */}
        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl w-full flex flex-col items-center"
          >
            <Logo className="mb-10" />
            
            <div className="text-center mb-8">
              <p className="text-gray-400 uppercase tracking-widest text-sm mb-3">Tu perfil de liderazgo es:</p>
              <h2 className={`text-4xl sm:text-6xl font-bold mb-6 ${getResult(score).colorClass}`}>
                {getResult(score).title}
              </h2>
            </div>

            {/* Score Progress */}
            <div className="w-full max-w-md mb-12">
              <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
                <span>Operativo</span>
                <span>Estratégico</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${getResult(score).bgClass}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getResult(score).progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 sm:p-10 w-full mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {getResult(score).message}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {getResult(score).description}
              </p>
            </div>

            {/* CTA Block */}
            <div className="w-full border border-xetro-violet/30 bg-xetro-violet/5 rounded-2xl p-8 text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-xetro-violet/5 pointer-events-none rounded-2xl"></div>
              <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 text-gray-100">
                "El verdadero cambio no está en trabajar más, está en dejar de operar y empezar a diseñar. <span className="neon-text-violet-light font-semibold">Ahí es donde la IA se convierte en tu ventaja competitiva.</span>"
              </p>
              <a 
                href="#" 
                className="btn-primary btn-primary-glow inline-flex px-10 py-4 rounded-full text-lg items-center gap-2"
              >
                Conocé XETRO
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <button 
              onClick={handleRestart}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Volver a intentar</span>
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-4 text-center w-full text-xs text-gray-600 tracking-widest font-mono">
        POWERED BY XETRO | IA SOFTWARE FACTORY
      </div>
    </div>
  );
}
