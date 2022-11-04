export const STARTING_TRAIT = 'user_start';

export const sections: Array<Section> = [
    {
        choiceLabel: null,
        trait: null,
        description: "How are you?",
        prerequisite: null,
    },
    {
        choiceLabel: 'I\'m doing well!',
        trait: 'user_doing_well',
        description: "Good to hear that!",
        prerequisite: STARTING_TRAIT
    },
    {
        choiceLabel: 'How is Max doing?',
        trait: null,
        description: "He's growing fast - has big paws.",
        prerequisite: 'user_doing_well'
    }
];
