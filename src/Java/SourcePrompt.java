import java.util.List;
import java.util.ArrayList;

public class SourcePrompt extends Source{

    private String prompt;

    public SourcePrompt(String prompt){
        this.prompt = prompt;
    }

    public String getPrompt(){
        return this.prompt;
    }

    @Override
    public List<String> search(int numSites){
        return null;
    }
}