import { renderHook } from '@testing-library/react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useQuestions } from '@/db/queries';

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn(),
}));

describe('useQuestions', () => {
  const mockGetAllAsync = jest.fn();
  const mockGetFirstAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSQLiteContext as jest.Mock).mockReturnValue({
      getAllAsync: mockGetAllAsync,
      getFirstAsync: mockGetFirstAsync,
    });
  });

  it('formatar as questões e buscar baseadas em tags e status', async () => {
    const { result } = renderHook(() => useQuestions('N5'));

    mockGetAllAsync.mockResolvedValueOnce([{
      id: 1,
      questionText: 'Test',
      questionType: 'grammar',
      alternative1: 'A',
      alternative2: 'B',
      alternative3: null,
      alternative4: null,
      correctAlternative: 1,
      imagePath: '/img.png',
      tags: 'noun,verb'
    }]);

    const questions = await result.current.searchQuestionsFilters('grammar', ['noun'], 'unanswered', 10);

    // Verifica se a query foi montada corretamente com o WhereClause
    const calledQuery = mockGetAllAsync.mock.calls[0][0]; // A string da query
    const calledParams = mockGetAllAsync.mock.calls[0][1]; // O dicionário de valores

    expect(calledQuery).toContain('WHERE N5.questions.question_type = $N5questionsquestion_type0');
    expect(calledQuery).toContain('N5.tags.name IN ($N5tagsname10)');
    expect(calledQuery).toContain('main.answered_questions.answered_date is NULL');
    expect(calledQuery).toContain('LIMIT 10');
    
    expect(calledParams).toEqual({
      '$N5questionsquestion_type0': 'grammar',
      '$N5tagsname10': 'noun'
    });

    // Verifica se o formatQuestion transformou o resultado corretamente
    expect(questions.length).toBe(1);
    expect(questions[0].alternatives).toEqual(['A', 'B']); // Filtrou os nulls
    expect(questions[0].image).toBe('N5/img.png'); // Adicionou o prefixo do level
    expect(questions[0].tags).toEqual(['noun', 'verb']); // Fez o split
  });

  it('searchQuestionsByStatement deve retornar array vazio se statement_id for nulo', async () => {
    const { result } = renderHook(() => useQuestions('N5'));
    
    // Simula que o getFirstAsync não achou o comando
    mockGetFirstAsync.mockResolvedValueOnce(null);

    const questions = await result.current.searchQuestionsByStatement('Comando Teste');

    expect(questions).toEqual([]);
    expect(mockGetAllAsync).not.toHaveBeenCalled();
  });

  it('selectLastExam deve retornar o exame se existir', async () => {
    const { result } = renderHook(() => useQuestions('N5'));
    const mockExam = { id: 1, score: 100, jlpt_level: 'N5' };
    
    mockGetAllAsync.mockResolvedValueOnce([mockExam]);

    const exam = await result.current.selectLastExam();

    expect(exam).toEqual(mockExam);
    expect(mockGetAllAsync).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM exam_attempts WHERE jlpt_level = 'N5' ORDER BY started_at DESC LIMIT 1")
    );
  });
});