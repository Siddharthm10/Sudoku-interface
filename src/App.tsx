import { Flex, TextFieldInput } from "@radix-ui/themes";
import "./App.css";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
    return (
        <>
            <main className="bg-slate-900 w-full h-full">
                <Flex>
                    <Navbar />
                    <Grid />
                </Flex>
            </main>
        </>
    );
}

export default App;
