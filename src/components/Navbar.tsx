import { Flex, Text } from "@radix-ui/themes";

function Navbar() {
    return (
        <Flex className="flex justify-center items-center text-center flex-col">
            <Text className=" text-5xl font-bold py-4">Sudoku Interface</Text>
            <Text className="py-2">
                Made with{" "}
                <img
                    className="inline hover:scale-110"
                    src="/src/assets/love.png"
                    alt="Love icon"
                />{" "}
                by Siddharth Mehta
            </Text>
        </Flex>
    );
}

export default Navbar;
