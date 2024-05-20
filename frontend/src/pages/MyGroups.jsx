import { useState } from 'react';
import { Box, Input, List, ListItem, Flex, Text, Button, Heading } from '@chakra-ui/react';

// Static collection
// We'll use API later
const groups = [
    {
        title: 'Buy apples',
        members: 3,
        isNew: true, // The user is not initially joined to the group
    },
    {
        title: 'Clean the house',
        members: 5,
        isNew: true,
    },
    {
        title: 'Go for a run',
        members: 15,
        isNew: true,
    },
    {
        title: 'Read a book',
        members: 40,
        isNew: true,
    },
    {
        title: 'Watch films',
        members: 10,
        isNew: true,
    },
    // ... other groups
];

function MyGroups() {
    const [groupState, setGroupState] = useState(groups);
    const [newGroupTitle, setNewGroupTitle] = useState('');


    const toggleGroupState = (index) => {
        setGroupState((prevGroups) => {
            const newGroups = [...prevGroups];
            newGroups[index].isNew = !newGroups[index].isNew;
            newGroups[index].members += newGroups[index].isNew ? 1 : -1;
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
            setNewGroupTitle('');
        }
    };

    // Counting the number of groups the user is a member of
    const myGroupCount = groupState.reduce((count, group) => group.isNew ? count + 1 : count, 0);

    return (
        <Box p={5}>
            <Heading as='h1' size='xl' mb={4}>My Groups</Heading>
            <Text mb={4}>Joined groups: {myGroupCount}</Text>
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
            <Text fontSize='lg' fontWeight='bold' mb={2}>List:</Text>
            <List spacing={3}>
                {groupState.map((group, index) => (
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

export default MyGroups;
