import { useState } from 'react';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';

export const useAI = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [bulkResults, setBulkResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendation = async (employeeId) => {
    try {
      setLoading(true);
      setError(null);
      setRecommendation(null);
      const data = await aiService.getRecommendation(employeeId);
      setRecommendation(data);
      toast.success('AI recommendation generated!');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'AI recommendation failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const rankAll = async () => {
    try {
      setLoading(true);
      setError(null);
      setRanking(null);
      const data = await aiService.rankAll();
      setRanking(data);
      toast.success('Employee ranking complete!');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'AI ranking failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const bulkRecommend = async (employeeIds) => {
    try {
      setLoading(true);
      setError(null);
      setBulkResults(null);
      const data = await aiService.bulkRecommend(employeeIds);
      setBulkResults(data);
      toast.success(`Generated ${data.totalProcessed} AI recommendations!`);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Bulk AI recommendations failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { recommendation, ranking, bulkResults, loading, error, getRecommendation, rankAll, bulkRecommend };
};
