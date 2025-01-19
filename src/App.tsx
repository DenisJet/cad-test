import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Canvas } from "@react-three/fiber";
import Cube from "./components/Cube/Cube";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/ModeToggle/ModeToggle";
import axios, { AxiosError } from "axios";

function App() {
  const [error, setError] = useState("");
  const [cubeData, setCubeData] = useState<{
    vertices: number[];
    indices: number[];
  }>({ vertices: [], indices: [] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      width: "",
      depth: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("http://localhost:5000/api/cube", values);

      console.log(res.data);
      setCubeData(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data.message);
        }
        if (error.request) {
          setError("Error! Try again later.");
        }
      }
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen grid sm:grid-cols-3">
        {error && <span>{error}</span>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-8 text-right border-2"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">CubeGen</h1>
              <ModeToggle />
            </div>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="height" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="width" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depth</FormLabel>
                  <FormControl>
                    <Input placeholder="length" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Calculate</Button>
          </form>
        </Form>
        <div
          id="canvas-container"
          className="h-full sm:h-lvh sm:col-span-2 border-2"
        >
          <Canvas>
            <ambientLight intensity={1} />
            <directionalLight castShadow position={[3, 7, 10]} intensity={2} />
            <directionalLight position={[0, -6, -10]} intensity={2} />

            <Cube vertices={cubeData.vertices} indices={cubeData.indices} />
          </Canvas>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
