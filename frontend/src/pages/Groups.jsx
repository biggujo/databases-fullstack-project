import { useState } from 'react';
import { Box, Input, List, ListItem, Flex, Text, Button, Heading } from '@chakra-ui/react';

// Static collection
// We'll use API later
const groups = [
    {
        title: 'Buy apples',
        members: 3,
        isNew: false, // The user is not initially joined to the group
    },
    {
        title: 'Clean the house',
        members: 5,
        isNew: false,
    },
    {
        title: 'Go for a run',
        members: 15,
        isNew: false,
    },
    {
        title: 'Read a book',
        members: 40,
        isNew: false,
    },
    {
        title: 'Watch films',
        members: 10,
        isNew: false,
    },
    // ... other groups
];

function Groups() {
    const [filter, setFilter] = useState('');
    const [groupState, setGroupState] = useState(groups);
    const [newGroupTitle, setNewGroupTitle] = useState('');

    // Function for changing the state and number of group members
    const toggleGroupState = (index) => {
        setGroupState((prevGroups) => {
            const newGroups = [...prevGroups];
            // If the user joins the group, increase the number of members
            if (!newGroups[index].isNew) {
                newGroups[index].members += 1;
            } else {
                // If the user leaves the group, reduce the number of members
                newGroups[index].members -= 1;
            }
            newGroups[index].isNew = !newGroups[index].isNew;
            return newGroups;
        });
    };

    // Function for adding a new group
    const addNewGroup = () => {
        if (newGroupTitle) {
            setGroupState(prevGroups => [
                ...prevGroups,
                { title: newGroupTitle, members: 1, isNew: true }
            ]);
            setNewGroupTitle(''); // Очистка поля ввода после добавления
        }
    };

    const filteredGroups = groupState.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Box p={5}>
            <Heading as='h1' size='xl' mb={4}>Groups</Heading>
            <Text mb={4}>Available amount: {groupState.length}</Text>
            <Box mb={5}>
                <Input
                    placeholder='Create a new group...'
                    value={newGroupTitle}
                    onChange={(e) => setNewGroupTitle(e.target.value)}
                />
                <Button
                    onClick={addNewGroup}
                    mt={2}
                    bg='purple.500'
                    color='white'
                    _hover={{ bg: 'purple.800' }}
                >
                    Create Group
                </Button>
            </Box>
            <Box mb={5}>
                <Input
                    placeholder='Search for groups...'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Box>
            <List spacing={3}>
                {filteredGroups.map((group, index) => (
                    <ListItem key={group.title} p={3} bg='purple.100' borderRadius='md'>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Text fontSize='lg'>{group.title}</Text>
                            <Flex alignItems='center'>
                                <Text fontSize='sm' mr={4}>Members: {group.members}</Text>
                                <Button
                                    onClick={() => toggleGroupState(index)}
                                    colorScheme={group.isNew ? 'red' : 'green'}>
                                    {group.isNew ? 'Leave' : 'Join'}
                                </Button>
                            </Flex>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Groups;