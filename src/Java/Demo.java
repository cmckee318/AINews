import java.util.List;
import java.util.ArrayList;

public class Demo{

    public static void main(String args[]){
        SourceLink NPR = new SourceLink("https://text.npr.org", "a.topic-title", "NPR");
        SourceLink THN = new SourceLink("https://thehackernews.com/", "a.story-link", "The Hacker News");
        List<String> summaries = new ArrayList<>();

        List<String> list = THN.search(4);

        for(String item: list){
            System.out.println(item);
            summaries.add(AISummary.summarize(item));
        }

        for(String i: summaries){
            System.out.println(i + "\n\n");
        }


//         System.out.printf("Titles && summaries:\n\n %s\n", AISummary.summarize(THNData));
    }
}