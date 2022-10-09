import AddressBookService from "./addressBookService";
import AuthenticationService from "./authenticationService";
import CatalogService from "./catalogService";
import ConfigurationService from "./configurationService";
import InternationalizationService from "./internationalizationService";
import LocalStrorageService from "./localStorageService";
import LoggingService from "./loggingService";
import MembershipService from "./membershipService";

export default class BaseService {
    public AddressBook : AddressBookService = new AddressBookService();
    public Catalog : CatalogService = new CatalogService();
    public Membership : MembershipService  = new MembershipService();
    public Configuration : ConfigurationService = new ConfigurationService();
    public LocalStorage : LocalStrorageService = new LocalStrorageService();
    public Authentication : AuthenticationService = new AuthenticationService();
    public Internationalization : InternationalizationService = new InternationalizationService();
    public Logging : LoggingService = new LoggingService();
}