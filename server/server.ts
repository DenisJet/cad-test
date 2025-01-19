import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/cube", (req: Request, res: Response) => {
  const { width, height, depth } = req.body;
  const w = Number(width);
  const h = Number(height);
  const d = Number(depth);

  const vertices = [
    -w / 2,
    -h / 2,
    d / 2,
    w / 2,
    -h / 2,
    d / 2,
    w / 2,
    h / 2,
    d / 2,
    -w / 2,
    h / 2,
    d / 2,
    -w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    -h / 2,
    -d / 2,
    w / 2,
    h / 2,
    -d / 2,
    -w / 2,
    h / 2,
    -d / 2,
  ];

  const indices = [
    0, 1, 2, 0, 2, 3,

    4, 6, 5, 4, 7, 6,

    0, 4, 5, 0, 5, 1,

    1, 5, 6, 1, 6, 2,

    3, 2, 6, 3, 6, 7,

    0, 3, 7, 0, 7, 4,
  ];

  res.json({ vertices, indices });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
