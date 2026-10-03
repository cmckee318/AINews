import io.github.ollama4j.Ollama;
import io.github.ollama4j.models.chat.OllamaChatMessageRole;
import io.github.ollama4j.models.chat.OllamaChatRequest;
import io.github.ollama4j.models.chat.OllamaChatResult;
import io.github.ollama4j.utils.Options;
import io.github.ollama4j.utils.OptionsBuilder;
import io.github.ollama4j.exceptions.OllamaException;


public class AISummary{
    private static final String HOST_URL = "http://localhost:11434";
    private static final String MODEL = "llama3.2";
    private static final String SYSTEM_PROMPT =
                "You are a concise but detailed news summarizer. You will be given multiple sources. "
                + "Format the summaries exactly as follows -> Title: title\nSummary: summary\nTitle: title\nSummary: summary\n..."
                + "Output no extra text or response"
                + "summaries should be as close to a paragraph as possible and rich in detail";

    private static final Ollama ollama = new Ollama(HOST_URL);
    private static final Options OPTIONS = new OptionsBuilder().setTemperature(0.1f).setNumCtx(32768).build();


    public static String summarize(String prompt){
        try{
            ollama.setRequestTimeoutSeconds(300);
            OllamaChatRequest request = OllamaChatRequest.builder().withModel(MODEL).withOptions(OPTIONS).withMessage(OllamaChatMessageRole.SYSTEM, SYSTEM_PROMPT).withMessage(OllamaChatMessageRole.USER, prompt).build();

            OllamaChatResult result = ollama.chat(request, null);

            return result.getResponseModel().getMessage().getResponse();
        }catch(Exception e) {
                   System.out.println(e.getMessage());
                   return null;
        }
    }
}