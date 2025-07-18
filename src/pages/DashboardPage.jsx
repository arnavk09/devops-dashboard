import { useEffect, useState } from "react";
import { fetchPipelineRuns } from "../services/pipelineService";
import {Container,Typography,Paper,List,ListItemText,Chip,Stack,} from "@mui/material";

const statusColorMap = {
  success: "success",
  failed: "error",
  running: "warning",
  pending: "info",
};

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetchPipelineRuns()
      .then(setRuns)
      .catch((e) => console.error("Failed to fetch runs:", e));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Pipeline Runs
      </Typography>
      <List>
        {runs.map((run) => (
          <Paper key={run.id} sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <ListItemText
                primary={`Branch: ${run.branch}`}
                secondary={`Commit: ${run.commitSha}`}
              />
              <Chip label={run.status} color={statusColorMap[run.status] || "default"} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Started at: {new Date(run.startedAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {run.durationSeconds} seconds
            </Typography>
          </Paper>
        ))}
      </List>
    </Container>
  );
}