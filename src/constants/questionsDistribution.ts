type distributionByLevel = {
    level: 'N5' | 'N4',
    distribution: number[]
};

export const questionsDistribution : distributionByLevel[] = [
    {
        level: 'N5',
        distribution: [
            6, 5, 4, 7, 5, 7, 6, 6,
            5, 5, 2, 4, 3, 6, 3, 3
        ]
    }
];