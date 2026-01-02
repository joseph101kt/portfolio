"use client";
import { useState, useEffect, useRef } from 'react';

const HeroText = () => {
  const [displayText, setDisplayText] = useState('');
  const [staticText, setStaticText] = useState('');
  const [showUnderline, setShowUnderline] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'phase1' | 'phase2' | 'phase3' | 'complete'>('phase1');
  const prefersReducedMotion = useRef(false);
  const hasAnimated = useRef(false);

  // Font families for scrambling effect
  const scrambleFonts = [
    'font-mono',
    'font-sans',
    'font-serif',
  ];

  // Character substitution maps for scrambling effect
  const getScrambleChar = (char: string): { char: string; font: string } => {
    const scrambleMap: Record<string, string[]> = {
      'F': ['f', 'F', 'E', 'P', 'ƒ', '₣'],
      'r': ['r', 'R', 'P', 'K', 'Я', 'ɾ'],
      'o': ['o', 'O', '0', 'Q', 'Ø', '◯'],
      'n': ['n', 'N', 'M', 'H', 'И', 'η'],
      't': ['t', 'T', 'I', 'L', '†', 'τ'],
      'B': ['b', 'B', 'h', 'P', 'ß', 'β'],
      'a': ['a', 'A', 'e', '4', 'α', 'Λ'],
      'c': ['c', 'C', 'e', 'G', '¢', 'ς'],
      'k': ['k', 'K', 'R', 'X', 'κ', '₭'],
      'u': ['u', 'U', 'v', 'V', 'υ', 'μ'],
      'l': ['l', 'L', 'I', '1', '|', 'ι'],
      's': ['s', 'S', '5', '$', 'ς', '§'],
      'e': ['e', 'E', '3', 'є', 'ε', 'Σ'],
      'd': ['d', 'D', 'b', 'þ', 'δ', '∂'],
    };

    const lowerChar = char.toLowerCase();
    const options = scrambleMap[lowerChar];
    const randomFont = scrambleFonts[Math.floor(Math.random() * scrambleFonts.length)];
    
    if (!options) return { char, font: '' };
    return {
      char: options[Math.floor(Math.random() * options.length)],
      font: randomFont
    };
  };

  // Scramble both parts of text simultaneously
  const scrambleTextDual = (
    targetText1: string,
    targetText2: string,
    duration: number,
    intensity: number = 1
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (prefersReducedMotion.current) {
        setDisplayText(targetText1);
        setStaticText(targetText2);
        resolve();
        return;
      }

      const iterations = Math.floor(duration / 50);
      let currentIteration = 0;

      const interval = setInterval(() => {
        if (currentIteration < iterations) {
          const scrambled1 = targetText1
            .split('')
            .map((char, index) => {
              if (char === ' ') return '<span class="inline-block w-4"></span>';
              
              const progress = currentIteration / iterations;
              const charProgress = (index + 1) / targetText1.length;
              
              if (progress > charProgress * intensity) {
                return `<span class="inline-block">${char}</span>`;
              }
              
              const scrambled = getScrambleChar(char);
              return `<span class="inline-block ${scrambled.font}">${scrambled.char}</span>`;
            })
            .join('');

          const scrambled2 = targetText2
            .split('')
            .map((char, index) => {
              if (char === ' ') return '<span class="inline-block w-4"></span>';
              
              const progress = currentIteration / iterations;
              const charProgress = (index + 1) / targetText2.length;
              
              if (progress > charProgress * intensity) {
                return `<span class="inline-block">${char}</span>`;
              }
              
              const scrambled = getScrambleChar(char);
              return `<span class="inline-block ${scrambled.font}">${scrambled.char}</span>`;
            })
            .join('');
          
          setDisplayText(scrambled1);
          setStaticText(scrambled2);
          currentIteration++;
        } else {
          setDisplayText(targetText1.split('').map(c => 
            c === ' ' ? '<span class="inline-block w-4"></span>' : `<span class="inline-block">${c}</span>`
          ).join(''));
          setStaticText(targetText2.split('').map(c => 
            c === ' ' ? '<span class="inline-block w-4"></span>' : `<span class="inline-block">${c}</span>`
          ).join(''));
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  // Scramble text animation with font variations
  const scrambleText = (
    targetText: string,
    duration: number,
    intensity: number = 1
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (prefersReducedMotion.current) {
        setDisplayText(targetText);
        resolve();
        return;
      }

      const iterations = Math.floor(duration / 50);
      let currentIteration = 0;

      const interval = setInterval(() => {
        if (currentIteration < iterations) {
          const scrambled = targetText
            .split('')
            .map((char, index) => {
              if (char === ' ') return '<span class="inline-block w-4"></span>';
              
              const progress = currentIteration / iterations;
              const charProgress = (index + 1) / targetText.length;
              
              if (progress > charProgress * intensity) {
                return `<span class="inline-block">${char}</span>`;
              }
              
              const scrambled = getScrambleChar(char);
              return `<span class="inline-block ${scrambled.font}">${scrambled.char}</span>`;
            })
            .join('');
          
          setDisplayText(scrambled);
          currentIteration++;
        } else {
          setDisplayText(targetText.split('').map(c => 
            c === ' ' ? '<span class="inline-block w-4"></span>' : `<span class="inline-block">${c}</span>`
          ).join(''));
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  // Phase 2: Staggered fade transition
  const StaggeredTransition = ({ 
    oldText, 
    newText, 
    onComplete 
  }: { 
    oldText: string; 
    newText: string; 
    onComplete: () => void;
  }) => {
    const [chars, setChars] = useState(
      oldText.split('').map((char, i) => ({ 
        char, 
        state: 'visible' as 'visible' | 'exiting' | 'entering' | 'settled',
        isNew: false,
        index: i
      }))
    );

    useEffect(() => {
      if (prefersReducedMotion.current) {
        onComplete();
        return;
      }

      // Start exit animation
      oldText.split('').forEach((_, i) => {
        setTimeout(() => {
          setChars(prev => 
            prev.map((c, idx) => 
              idx === i ? { ...c, state: 'exiting' } : c
            )
          );
        }, i * 50);
      });

      // Replace with new text after exit
      setTimeout(() => {
        setChars(
          newText.split('').map((char, i) => ({
            char,
            state: 'entering',
            isNew: true,
            index: i
          }))
        );

        // Settle each character
        newText.split('').forEach((_, i) => {
          setTimeout(() => {
            setChars(prev => 
              prev.map((c, idx) => 
                idx === i ? { ...c, state: 'settled' } : c
              )
            );
          }, i * 50);
        });

        // Complete transition
        setTimeout(() => {
          onComplete();
        }, newText.length * 50 + 100);
      }, oldText.length * 50 + 100);
    }, []);

    return (
      <span className="inline-block relative">
        {chars.map((item, i) => (
          <span
            key={`${item.isNew ? 'new' : 'old'}-${i}`}
            className={`inline-block transition-all duration-300 ${
              item.state === 'exiting'
                ? 'opacity-0 translate-y-2'
                : item.state === 'entering'
                ? 'opacity-0 -translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {item.char}
          </span>
        ))}
      </span>
    );
  };

  const [phase2Active, setPhase2Active] = useState(false);
  const [phase2Text, setPhase2Text] = useState({ old: '', new: '' });

  // Main animation sequence
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    }

    const runAnimation = async () => {
      if (prefersReducedMotion.current) {
        // Reduced motion: simple fade transitions
        setDisplayText('front');
        setStaticText('end');
        setCurrentPhase('phase2');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDisplayText('back');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDisplayText('full stack');
        setStaticText('');
        setCurrentPhase('complete');
        setShowUnderline(true);
        setAnimationComplete(true);
        return;
      }

      // Phase 1: Identity Reveal - scramble both "front" AND "end" together
      setCurrentPhase('phase1');
      await scrambleTextDual('front', 'end', 600, 1);
      
      // Pause before phase 2
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Phase 2: Role Shift - transition from "front" to "back" (keeping "end")
      setCurrentPhase('phase2');
      setPhase2Text({ old: 'front', new: 'back' });
      setPhase2Active(true);
      
      await new Promise(resolve => setTimeout(resolve, 1400));
      setPhase2Active(false);
      setDisplayText('back');
      setStaticText('end');

      // Pause before phase 3
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Phase 3: Scope Expansion - scramble entire "backend" into "full stack"
      setCurrentPhase('phase3');
      setStaticText(''); // Clear static text before scramble
      await scrambleText('full stack', 700, 0.8);

      // Show underline and mark complete
      setCurrentPhase('complete');
      setShowUnderline(true);
      setAnimationComplete(true);
    };

    runAnimation();
  }, []);

  // Font class based on phase
  const getFontClass = () => {
    if (currentPhase === 'complete') {
      return 'font-black';
    }
    return 'font-black';
  };

  const getFontStyle = () => {
    if (currentPhase === 'complete') {
      return {
        fontFamily: '"Bebas Neue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        letterSpacing: '0.02em',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
      };
    }
    return {
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      letterSpacing: '-0.03em'
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Main headline with animation */}
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
        {/* Screen reader gets the final state */}
        <span className="sr-only">Full stack developer</span>
        
        {/* Visual animation */}
        <span aria-hidden="true" className="block">
          <span 
            className={`text-purple-400 inline-block relative transition-all duration-300 ${getFontClass()}`}
            style={getFontStyle()}
          >
            {phase2Active ? (
              <>
                <StaggeredTransition
                  oldText={phase2Text.old}
                  newText={phase2Text.new}
                  onComplete={() => {}}
                />
                <span dangerouslySetInnerHTML={{ __html: staticText }} />
              </>
            ) : (
              <span className="inline-block relative">
                <span dangerouslySetInnerHTML={{ __html: displayText }} />
                <span dangerouslySetInnerHTML={{ __html: staticText }} />
                {showUnderline && (
                  <span 
                    className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-400 to-violet-500 transition-all duration-500 ${
                      animationComplete ? 'w-full' : 'w-0'
                    }`}
                  />
                )}
              </span>
            )}
          </span>
          <span 
            className={`text-white transition-all duration-300 ${getFontClass()}`}
            style={getFontStyle()}
          > developer</span>
        </span>
      </h1>

      {/* Static supporting line - always visible */}
      <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
        Crafting pixel-perfect interfaces and scalable architectures
        <span className="text-gray-500 block mt-2 text-lg">that bridge design vision with technical reality.</span>
      </p>
    </div>
  );
};

export default HeroText;