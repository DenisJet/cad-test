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

function App() {
  const [width, setWidth] = useState("1");
  const [height, setHeight] = useState("1");
  const [depth, setDepth] = useState("1");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: width,
      width: height,
      depth: depth,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setWidth(values.width);
    setHeight(values.height);
    setDepth(values.depth);
  }

  return (
    <div className="grid grid-cols-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      <div id="canvas-container">
        <Canvas>
          <directionalLight castShadow position={[3, 7, 10]} intensity={2} />
          <directionalLight position={[0, -6, -10]} intensity={2} />
          <Cube width={width} height={height} depth={depth} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
