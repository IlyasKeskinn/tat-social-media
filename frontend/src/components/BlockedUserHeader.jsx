import { Text, VStack } from '@chakra-ui/react';
import UserHeader from './UserHeader';
import PropTypes from 'prop-types';

const BlockedUserHeader = ({ user }) => {
    return (
        <VStack gap={0} flex={1}>
            <UserHeader user={user} posts={0} tab={"post"} />
            <Text fontSize="lg" mt={5} color="red.500">
                You cannot view {user.userName}&apos;s profile because you have blocked them.
            </Text>
        </VStack>
    );
}

BlockedUserHeader.propTypes = {
    user: PropTypes.object
}

export default BlockedUserHeader