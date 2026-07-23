import { renderHook } from '@testing-library/react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserDatabase } from '@/db/insertions';
import { Question } from '@/types/types';

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn(),
}));

describe('useUserDatabase', () => {
  const mockRunAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSQLiteContext as jest.Mock).mockReturnValue({
      runAsync: mockRunAsync,
    });
  });

  it('inserir uma resposta corretamente no banco de dados', async () => {
    const { result } = renderHook(() => useUserDatabase());
    
    const mockQuestion = { id: 10, correctAlternative: 2 } as Question;
    mockRunAsync.mockResolvedValueOnce(undefined);

    const success = await result.current.insertAnswer(mockQuestion, 'N5', 2);

    expect(success).toBe(true);
    expect(mockRunAsync).toHaveBeenCalledWith(
      'INSERT INTO answered_questions (jlpt_level, is_correct, question_id) VALUES (?,?,?)',
      'N5',
      true,
      10
    );
  });

  it('retornar false se a inserção da resposta falhar', async () => {
    const { result } = renderHook(() => useUserDatabase());
    const mockQuestion = { id: 10, correctAlternative: 1 } as Question;

    mockRunAsync.mockRejectedValueOnce(new Error('DB Error')); 

    const success = await result.current.insertAnswer(mockQuestion, 'N5', 2);

    expect(success).toBe(false);
    expect(mockRunAsync).toHaveBeenCalledWith(expect.any(String), 'N5', false, 10);
  });

  it('inserir uma tentativa de simulado corretamente', async () => {
    const { result } = renderHook(() => useUserDatabase());
    mockRunAsync.mockResolvedValueOnce(undefined);

    const success = await result.current.insertExam(90, 100, 90, 1600000000, 1600003600, true, 'N4');

    expect(success).toBe(true);
    expect(mockRunAsync).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO exam_attempts'),
      '90', '100', '90', '1600000000', '1600003600', '1', 'N4'
    );
  });
});