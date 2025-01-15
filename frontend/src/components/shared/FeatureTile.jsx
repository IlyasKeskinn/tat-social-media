import { Box, Flex, Text } from "@chakra-ui/react"
import PropTypes from "prop-types";

const FeatureTile = ({ icon: Icon, title, description, onClick }) => {
    return (
        <Box
            width={"100%"}
            cursor={"pointer"}
            _hover={{
                bg: "whiteAlpha.100"
            }}
            p={4}
            rounded={8}
            transition={"all 300ms"}
            onClick={onClick}
        >
            <Flex gap={4} alignItems={"center"}>
                <Box>
                    <Icon size={24} />
                </Box>
                <Box>
                    <Flex direction={"column"}>
                        <Text>{title}</Text>
                        <Text color={"gray.500"}>{description}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

FeatureTile.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func
}

export default FeatureTile