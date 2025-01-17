import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

const ComplianceDemo = () => {
  const [mode, setMode] = useState('select'); // select, traditional, adaptive
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);

  const startTraditional = () => {
    setMode('traditional');
    setProgress(0);
    // Simulate locked progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimer(null);
          setQuestion('traditional');
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
    setTimer(interval);
  };

  const startAdaptive = () => {
    setMode('adaptive');
    setQuestion('pretest');
  };

  const handleAnswer = (correct) => {
    if (mode === 'adaptive') {
      if (correct) {
        setResult('pass');
      } else {
        setQuestion('learning');
      }
    } else {
      setResult(correct ? 'pass' : 'fail');
    }
  };

  const reset = () => {
    setMode('select');
    setProgress(0);
    setQuestion(null);
    setResult(null);
    if (timer) clearInterval(timer);
    setTimer(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-center">
            Interactive Compliance Training Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mode === 'select' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center mb-4">Choose Your Training Approach:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={startTraditional}
                  className="p-6 h-auto flex flex-col items-center gap-2"
                >
                  <Lock className="h-8 w-8 mb-2" />
                  <span>Traditional Locked Approach</span>
                  <span className="text-sm opacity-75">Must complete full duration</span>
                </Button>
                <Button 
                  onClick={startAdaptive}
                  className="p-6 h-auto flex flex-col items-center gap-2"
                  variant="secondary"
                >
                  <Unlock className="h-8 w-8 mb-2" />
                  <span>Adaptive Pre-test Approach</span>
                  <span className="text-sm opacity-75">Test your knowledge first</span>
                </Button>
              </div>
            </div>
          )}

          {mode === 'traditional' && !question && (
            <div className="space-y-4">
              <h3 className="font-semibold">Traditional Module Progress</h3>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm opacity-75">
                Please wait while the content loads... {progress}%
              </p>
            </div>
          )}

          {question === 'traditional' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Knowledge Check</h3>
              <p>What is the primary purpose of compliance training?</p>
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAnswer(true)}
                  className="w-full justify-start"
                  variant="outline"
                >
                  Ensure adherence to regulations and standards
                </Button>
                <Button 
                  onClick={() => handleAnswer(false)}
                  className="w-full justify-start"
                  variant="outline"
                >
                  Complete required hours of training
                </Button>
              </div>
            </div>
          )}

          {question === 'pretest' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Pre-test Question</h3>
              <p>What is the primary purpose of compliance training?</p>
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAnswer(true)}
                  className="w-full justify-start"
                  variant="outline"
                >
                  Ensure adherence to regulations and standards
                </Button>
                <Button 
                  onClick={() => handleAnswer(false)}
                  className="w-full justify-start"
                  variant="outline"
                >
                  Complete required hours of training
                </Button>
              </div>
            </div>
          )}

          {question === 'learning' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Learning Module</h3>
              <p>Compliance training ensures organizations and employees understand and follow regulatory requirements, reducing risks and maintaining ethical standards.</p>
              <Button 
                onClick={() => setResult('pass')}
                className="w-full"
              >
                Complete Learning
              </Button>
            </div>
          )}

          {result && (
            <div className="text-center space-y-4">
              {result === 'pass' ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <h3 className="font-semibold">Congratulations!</h3>
                  <p>You've successfully completed the training.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <XCircle className="h-12 w-12 text-red-500" />
                  <h3 className="font-semibold">Try Again</h3>
                  <p>Review the material and retry the assessment.</p>
                </div>
              )}
              <Button onClick={reset} variant="outline">
                Try Another Approach
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDemo;