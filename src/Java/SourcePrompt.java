public class SourcePrompt extends Source{

    private String prompt;

    public SourcePrompt(String prompt){
        this.prompt = prompt;
    }

    public String getPrompt(){
        return this.prompt;
    }

    @Override
    public String search(int numSites){
        return "";
    }
}