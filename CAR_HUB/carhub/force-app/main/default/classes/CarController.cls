/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 04-12-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 **/
public with sharing class CarController {
  @AuraEnabled(Cacheable=true)
  public static List<Car__c> getCars(Filters filters) {
    String key, whereClause = '';
    Decimal maxPrice;
    String[] categories, makeType, criteria = new List<String>{};
    if (filters != null) {
      maxPrice = filters.maxPrice;
      categories = filters.categories;
      makeType = filters.makeTypes;
      if (!String.isEmpty(filters.searchKey)) {
        key = '%' + filters.searchKey + '%';
        criteria.add('Name LIKE :key');
      }
      if (filters.maxPrice >= 0) {
        criteria.add('MSRP__c <= :maxPrice');
      }
      if (filters.categories != null) {
        criteria.add('Category__c IN :categories');
      }
      if (filters.makeTypes != null) {
        criteria.add('Make__c IN :makeType');
      }
      if (criteria.size() > 0) {
        whereClause = 'WHERE ' + String.join(criteria, ' AND ');
      }
    }
    String query =
      'SELECT Id, Name, MSRP__c, Description__c, Category__c, Picture_URL__c FROM Car__c ' +
      whereClause +
      ' WITH SECURITY_ENFORCED ORDER BY Name';
    return Database.query(query);
  }

  public class Filters {
    @AuraEnabled
    public String searchKey { get; set; }
    @AuraEnabled
    public Decimal maxPrice { get; set; }
    @AuraEnabled
    public String[] categories { get; set; }
    @AuraEnabled
    public String[] makeTypes { get; set; }
  }
}
