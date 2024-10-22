const RuleEvaluator = () => {
    const [ruleId, setRuleId] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
  
    const handleEvaluate = async () => {
      try {
        const parsedData = JSON.parse(data);
        const response = await api.evaluateRule(ruleId, parsedData);
        setResult(response.result);
        setError('');
      } catch (error) {
        setError(error.message);
        setResult(null);
      }
    };
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Evaluate Rule</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2">Rule ID:</label>
          <input
            type="text"
            value={ruleId}
            onChange={(e) => setRuleId(e.target.value)}
            className="w-full