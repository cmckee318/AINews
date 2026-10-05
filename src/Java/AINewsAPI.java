import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class AINewsAPI {
    static String myFunction() {
        return NewsManager.getNews().toString();
    }

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/run", exchange -> {
            byte[] out = myFunction().getBytes(StandardCharsets.UTF_8);

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, out.length);
            exchange.getResponseBody().write(out);
            exchange.close();
        });
        server.start();
        System.out.println("Server started at http://localhost/api:8080");
    }
}