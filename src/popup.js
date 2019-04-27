/**
 * Format shop information into an html style string for the popup
 **/
export function getPopupContent(
		elementId,
		name,
		organic,
		bulk_purchase,
		housenumber,
		street,
		postcode,
		city,
		opening_hours,
		website,
        contact_website,
        facebook,
        contact_facebook,
		category,
        isANode
){
    // Check that name exists
    if (!name) {
        return null;
    }

	var popup = '<b>'+name+'</b><br />';
	// Set the shop type
	popup += getHtmlFormattedShopTitle(category, organic, bulk_purchase);
    popup += getHtmlFormattedAddress(housenumber, street, postcode, city);   
    popup += getHtmlFormattedHours(opening_hours);
    popup += getHtmlFormattedWebsite(website, contact_website, facebook, contact_facebook);
    popup += getHtmlFormattedContribution(elementId, isANode);
	return popup;
}

/**
 * Get a title describing the shop type
 */
export function getHtmlFormattedShopTitle(category, organicTag, bulk_purchaseTag) {
    // Start text with italic style and add prefix depending on type
    var title = category.prefix;
    
    // Add different suffix depending if it's a shop selling some bulk products or mainly bulk products
    if (category.addBulkSuffix) {
	    if (bulk_purchaseTag == "only") {
	        title += ', 100% bulk';
	    } else if (bulk_purchaseTag == "yes"){
	        title += ', accepts containers';
	    } else {
	        title += ', accepts containers';
	    }
	}

    // Add annotation if products are organics
    if (category .addOrganicSuffix) {
	    if (organicTag == "yes") {
	    	title += ', partly organic.';
	    } else if (organicTag == "only") {
	        title += ', 100% organic.';
	    }
	}

    return '<i>' + title + '</i><br />';
}
/**
 * Transform OpenStreetMap hours into french readable hours (or not)
 **/
function getReadableHours(opening_hours){
    return opening_hours;
	/**.replace("Mo", "Lundi")
        .replace("Tu", "Mardi")
        .replace("We", "Mercredi")
        .replace("Th", "Jeudi")
        .replace("Fr", "Vendredi")
        .replace("Sa", "Samedi")
        .replace("Su", "Dimanche")
        .replace("off", "fermé")
        .replace(",", " & ");
	**/
}
/**
 * @return an HTML formatted website link
 */
function getHtmlFormattedWebsite(website, contact_website, facebook, contact_facebook) {
    var url;

    if (website) {
        url = website;
    } else if (contact_website) {
        url = contact_website;
    } else if (facebook) {
        url = facebook;
    } else if (contact_facebook) {
        url = contact_facebook;
    } else {
        return "";
    }

    return '<a href="' + url + '" target="_blank">Website</a><br />';
}

/**
 * @return an HTML formatted opening hours text
 */
function getHtmlFormattedHours(opening_hours) {
    var hours = "";
    if (!opening_hours) {
        return hours;
    }
    hours += '<b>Opening hours</b><br />';
    var hoursSplit = opening_hours.split('; ');
    for (var hoursIndex in hoursSplit) {
        hours += getReadableHours(hoursSplit[hoursIndex]) + '<br />';
    }
    return hours;
}
/**
 * @return an HTML formatted address
 */
function getHtmlFormattedAddress(housenumber, street, postcode, city) {
    var address = "";
    if (street && housenumber) {
        address += housenumber+' '+street+'<br />';
    } else if (street) {
        address += street+'<br />';
    }
    if (city && postcode) {
        address += postcode+' '+city+'<br />';
    } else if (city) {
        address += city+'<br />';
    }
    return address;
}

/**
 * @param elementId the OpenStreetMap id of the element
 * @param isAWay true if the element is a way, false if it's a node
 * @return an HTML formatted that adds a link for contributions
 */
function getHtmlFormattedContribution(elementId, isAWay) {
    if (!elementId) {
        return "";
    }
    
    var baseUrl; 
    
    if (isAWay) {
        baseUrl = "https://openstreetmap.org/way/";
    } else { 
        baseUrl = "https://openstreetmap.org/node/";
    }

    var contributionHtml =  '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
    contributionHtml += '<a href="'+baseUrl+elementId+'" target="_blank" title="Edit' +
    ' information on OpenStreetMap. This map will then be updated shortly after (if not, drop us a line).">Edit information</a>';
    return contributionHtml;
}