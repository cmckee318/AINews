import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;


public class SourceLink extends Source{
    private String linkMain;
    private String selection;
    private String name;
    private List<String> sources = new ArrayList<>();

    public SourceLink(String linkMain, String selection, String name){
        this.linkMain = linkMain;
        this.selection = selection;
        this.name = name;
    }

    @Override
    public List<String> search(int numSites){

        Document mainDoc = scraping(this.linkMain);
        if(mainDoc == null){
            return  null;
        }

        Elements links = mainDoc.select(selection);

        for(int i=0; i< numSites; i++){
            String link = links.get(i).absUrl("href");
            Document doc = scraping(link);
            String bodyText = doc.body().text();
            if(bodyText.length() > 1000){
                sources.add("Link: " + link + "\nText: " + bodyText + "\n");
            }
        }
        return sources;
    }

    private Document scraping(String link){
        try{
            Document doc = Jsoup.connect(link)
                        .userAgent("Mozilla/5.0 (compatible; MyNewsScraper/1.0)")
                        .timeout(15_000)
                        .get();
            return doc;
        }catch(IOException e){
            System.err.println("Failed to fetch " + link + ": " + e.getMessage());
                    return null;
        }
    }


}