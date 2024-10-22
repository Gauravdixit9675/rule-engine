import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const RuleEvaluator = ({ ruleId }) => {
  const [jsonData, setJsonData] = useState('');
  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    try {
      const response = await fetch('/api/rules/evaluate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rule_id: ruleId,
          data: JSON.parse(jsonData),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to evaluate rule');
      }
      
      const data = await response.json();
      setResult(data.result);
      
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setResult(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">Evaluate Rule</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Input Data (JSON)</label>
            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='{"age": 35, "department": "Sales", "salary": 60000}'
              rows={5}
            />
          </div>
          <Button onClick={handleEvaluate} className="w-full">
            Evaluate
          </Button>
          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="font-medium">Result: {result ? 'True' : 'False'}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { RuleEditor, RuleEvaluator };