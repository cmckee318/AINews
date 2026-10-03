import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;

public class SourceLink extends Source{
    private String linkMain;
    private String selection;
    private String name;

    public SourceLink(String linkMain, String selection, String name){
        this.linkMain = linkMain;
        this.selection = selection;
        this.name = name;
    }

    @Override
    public String search(int numSites){
        String output = "Site: " + name + " Source number: " + numSites + "\n";

        Document mainDoc = scraping(this.linkMain);
        if(mainDoc == null){
            return "Error doc is null";
        }

        Elements links = mainDoc.select(selection);

        for(int i=0; i< numSites; i++){
            String link = links.get(i).absUrl("href");
            Document doc = scraping(link);
            String bodyText = doc.body().text();

            output += "Link: " + i + "\nText: " + bodyText + "\n";
        }
        return output;
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